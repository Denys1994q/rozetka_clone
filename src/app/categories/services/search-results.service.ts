import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ProductInterface } from 'src/app/core/services/api-response-types';
import { forkJoin, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SearchResultsService {
    public resetPriceValue = new Subject();
    productsLoading: boolean = false
    // всі можливі параметри пошуку на основі вибраних товарів
    searchParams: any = []
    // обрані параметри пошуку і їх опції 
    selectedInputs: any[] = []
    // товари 
    currentCategory!: any
    currentSubcategory!: any
    currentSubcategoryCopy!: any
    // ціна 
    priceDataStart!: any
    priceDataEnd!: any
    // типи сортування 
    optionsToSort = [
        'За рейтингом',
        'Від дешевих до дорогих',
        'Від дорогих до дешевих',
        'Новинки'
    ]
    // позиція сортування
    sortType: string = this.optionsToSort[0]
    // base input
    baseInput!: string 
    // 
    selectedRaitingIndex!: any

    constructor(private apiService: ApiService) {}

    setBaseInput(val: string) {
        this.baseInput = val
    }

    resetSearchParams() {
        this.searchParams = []
    }

    // фільтрує всі параметри пошуку, залишаючи ті, які були вибрані 
    filterSearchParams(input: string) {
        let priceSearchParam = this.searchParams.find((item: any) => item.title === 'Ціна')
        let newStart = 0
        let newEnd = 0
        if (input.includes('грн')) {
            priceSearchParam.options[0].label = input
            const dashIdx = input.indexOf('-')
            const uahIdx = input.indexOf('грн')
            newStart = +input.slice(0, dashIdx-1)
            newEnd = +input.slice(dashIdx+1, uahIdx-1)
            priceSearchParam.options[0].newStart = +newStart
            priceSearchParam.options[0].newEnd = +newEnd
        } 
        // копія всіж можливих параметрів пошуку
        let copySearchParams = JSON.parse(JSON.stringify(this.searchParams))
        // об'єкт із параметрів пошуку, який додається
        let newOb = copySearchParams.find((param: any) => param.options.find((i: any) => i.label === input))
        // залишити тільки ті опції, які відповідають клікнутому інпуту
        newOb.options = newOb.options.filter((d: any) => d.label === input)
        // чи є такий об'єкт в this.selectedInputs
        const s = this.selectedInputs.find(selectedInput => selectedInput.searchPosition === newOb.searchPosition)
            // якщо такого об'єкту ще немає 
            if (!s) {
                // і немає такого інпута 
                if (!this.selectedInputs.find(k => k.options.find((s: any) => s.label === input))) {
                    this.selectedInputs.push(newOb)
                } 
            } 
            // якщо такий об'єкт є  
            else {
                if (!this.selectedInputs.find(k => k.options.find((s: any) => s.label === input))) {
                    if (s.title === 'Ціна') {
                        s.options[0].label = input
                        s.options[0].newStart = +newStart
                        s.options[0].newEnd = +newEnd
                    } else {
                        s.options.push({label: input, id: Math.random()})
                    }
                } 
            }
    }

    getCurrentCategory(id: string) {
        this.productsLoading = true
        this.searchParams = []
        this.apiService.getAllCategories().subscribe({
            next: categoriesData => {
                categoriesData.map((category: any) => {
                    category.subCategories.find((subcategory: any) => {
                      if (subcategory.id === id) {
                        this.currentCategory = category
                        let productObservables: Observable<ProductInterface>[] = [];
                        subcategory.products.forEach((prod: ProductInterface) => {
                            productObservables.push(this.apiService.getOneProduct(prod._id));
                        });
                        forkJoin(productObservables).subscribe({
                            next: (responses: ProductInterface[]) => {
                                this.currentSubcategory = subcategory
                                this.currentSubcategory.products = responses;
                                this.currentSubcategoryCopy = JSON.parse(JSON.stringify(subcategory))
                                this.currentSubcategoryCopy.products = JSON.parse(JSON.stringify(responses))
                                this.sortData(this.sortType)
                                this.createSearchParams();
                                if (this.baseInput) {
                                    this.addInput(this.baseInput)
                                    this.createSearchParams();
                                }
                                this.productsLoading = false
                            },
                            error: err => console.log(err)
                        });
                      }
                    })
                })
            },
            error: err => console.log(err)
        })
    }

    // ф-ія для генерації параметрів пошуку для ціни 
    createPriceSearchParams() {
        let minPrice = 0
        let maxPrice = 0
        let prodPrices: any = []
        this.currentSubcategory.products.map((product: any) => {
            prodPrices.push(product.searchStatus.find((it: any) => it.searchPosition === 'price').option.new)
            minPrice = Math.min(...prodPrices)
            maxPrice = Math.max(...prodPrices)
        })
        this.searchParams.push({searchPosition: 'price', title: 'Ціна', options: [{label: `${minPrice} - ${maxPrice} грн`, start: minPrice, end: maxPrice, id: Math.random()}] })
        this.priceDataStart = this.searchParams.find((it: any) => it.searchPosition === 'price').options[0].start
        this.priceDataEnd = this.searchParams.find((it: any) => it.searchPosition === 'price').options[0].end
    }

    // ф-ія для генерації параметрів пошуку на основі списку товарів
    createSearchParams() {
        this.searchParams = []
        this.createPriceSearchParams()
        this.currentSubcategory.products.map((product: ProductInterface) => {
          product.searchStatus.map((searchItem: any) => {
            if (searchItem.option === false) {
                return
            }
            const fsearchItem = this.searchParams.find((item: any) => item.title === searchItem.title) 
            // якщо такий searchItem вже є, тоді треба перевірити чи співпадають options, якщо ні, доповнити
            if (fsearchItem) {
                if (searchItem.searchPosition === 'price') {return}
                if (!fsearchItem.options.find((s: any) => s.label === searchItem.option)) {
                    // нова опція 
                    const newsearchItemOption = {label: searchItem.option, id: Math.random()} 
                    // масив нових опкцій
                    const newOptions = [...fsearchItem.options, newsearchItemOption]
                    // заміняємо або додаємо 
                    this.searchParams = this.searchParams.map((searcParam: any) => {
                        if (searcParam.title === fsearchItem.title) {
                            return {...fsearchItem, options: newOptions}
                        }
                        return searcParam
                    })
                }
            } // якщо немає такого searchItem взагалі, додаємо  
            else { 
                const opt = []
                const newsearchItemOption = {label: searchItem.option, id: Math.random()} 
                opt.push(newsearchItemOption)
                this.searchParams.push({searchPosition: searchItem.searchPosition, title: searchItem.title, options: opt})
            }
          })
        })
    }

    // ф-ія для фільтрації даних 
    filterData() {
        if (this.selectedInputs.length === 0) {
            this.currentSubcategory = JSON.parse(JSON.stringify(this.currentSubcategoryCopy))
        } else {
            this.currentSubcategory.products = this.currentSubcategoryCopy.products.filter((prod: any) => {
                let foundedPositions = 0
                for (let i = 0; i < this.selectedInputs.length; i++) {
                    prod.searchStatus.find((status: any) => {
                        if (this.selectedInputs[i].options.find((k: any) => k.label === status.option)) {
                            foundedPositions++
                        } else if (this.selectedInputs[i].title === 'Ціна' && (status.option.new >= this.selectedInputs[i].options[0].newStart && status.option.new <= this.selectedInputs[i].options[0].newEnd)) {
                            foundedPositions++
                        }
                    }) 
                    if (foundedPositions === this.selectedInputs.length) {
                        return prod
                    }
                }
            }) 
        }
        this.sortData(this.sortType)
    }

    // додати інпут в список обраних для пошуку і фільтрувати
    addInput(input: string) {
        this.filterSearchParams(input)
        this.filterData()
    }
    // додати інпут для панелі коментарів 
    addInputComment(input: string, selectedRaitingIndex: any) {
        this.selectedRaitingIndex = selectedRaitingIndex
        this.selectedInputs = [{options: [{label: input}] }]
    }

    // очистити весь список інпутів і фільтрувати
    removeAll() {
        if (this.currentSubcategoryCopy) {
            this.currentSubcategory = JSON.parse(JSON.stringify(this.currentSubcategoryCopy)) 
            // додав нижче
            this.createSearchParams()
        }
        this.selectedInputs = []
        this.baseInput = ''
        this.resetPriceValue.next(true)  

        this.sortType = this.optionsToSort[0]
        if (this.currentSubcategory) {
            this.sortData(this.sortType)
        }
    }

    // видалити один інпут і фільтрувати
    removeOne(input: string, fromCommentsPanel: boolean = false) {
        if (input.includes('грн')) {
            this.resetPriceValue.next(true)
        }
        this.selectedInputs = this.selectedInputs.filter((selectedInput) => {
            if (selectedInput.options.find((option: any) => option.label !== input)) {
                selectedInput.options = selectedInput.options.filter((s: any) => s.label !== input)
                return selectedInput
            } 
        })
        if (this.selectedInputs.length === 0 && !fromCommentsPanel) {     
            this.currentSubcategory = JSON.parse(JSON.stringify(this.currentSubcategoryCopy)) 
             // додав нижче
            this.createSearchParams()
            // нижче було
            this.sortData(this.sortType)     
        }
        if (!fromCommentsPanel) {
            this.filterData()
        }
    }

    sortData(sortType: string) {
        this.sortType = sortType
        if (sortType === 'За рейтингом') {
            const productsWithAvgRating = this.currentSubcategory.products.map((product: ProductInterface) => {
                const totalRatings = product.reviews_data.reduce((sum, review) => sum + review.rating, 0);
                const avgRating = totalRatings / product.reviews_data.length;
                return { ...product, avgRating };
            });
            this.currentSubcategory.products = productsWithAvgRating.sort((a: any, b: any) => b.avgRating - a.avgRating);
        } else if (sortType === 'Від дорогих до дешевих') {
            this.currentSubcategory.products = [...this.currentSubcategory.products].sort((a: any,b: any) => b.searchStatus.find((it: any) => it.searchPosition === 'price').option.new - a.searchStatus.find((it: any) => it.searchPosition === 'price' ).option.new)
        } else if (sortType === 'Від дешевих до дорогих') {
            this.currentSubcategory.products = [...this.currentSubcategory.products].sort((a: any,b: any) => a.searchStatus.find((it: any) => it.searchPosition === 'price' ).option.new - b.searchStatus.find((it: any) => it.searchPosition === 'price' ).option.new)
        } else if (sortType === 'Новинки') {
            this.currentSubcategory.products = [...this.currentSubcategory.products].sort((a: any,b: any) => a.date - b.date)
        }
    }

    resetRaitingValue() {
        this.selectedRaitingIndex = null
    }

}