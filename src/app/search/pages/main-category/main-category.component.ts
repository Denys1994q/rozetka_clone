import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchResultsService } from '../../services/search-results.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.sass']
})
export class MainCategoryComponent implements OnInit {
  category!: any 
  
  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    public SearchResultsService: SearchResultsService, 
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    // скидаємо попередньо вибрані інпути з інших сторінок, щоб коректно працювало 
    if (this.SearchResultsService.selectedInputs.length > 0) {
      this.SearchResultsService.removeAll()
    }

    this.route.url.subscribe(route => {
      const lastLetterBeforeId = this.router.url.lastIndexOf('/')
      const id = this.router.url.slice(lastLetterBeforeId+1, lastLetterBeforeId+this.router.url.length-1)

      this.apiService.getOneCategory(id).subscribe({
        next: (data) => this.category = data,
        error: (err) => console.log(err)
      })
    })
  }

  getCategories() {
    return this.category.subCategories.filter((item: any) => item.img)
  }

}
