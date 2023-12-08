import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface AlphabetItem {
  label: string,
  id: string
}

interface AlphabetObj {
  letter: string,
  items: AlphabetItem[]
}

@Component({
  selector: 'app-alphabet-block',
  templateUrl: './alphabet-block.component.html',
  styleUrls: ['./alphabet-block.component.sass']
})
export class AlphabetBlockComponent implements OnInit {
  @Input() data!: AlphabetItem[]
  @Output() alphabetBlockChange = new EventEmitter<string>();
  showBlock: boolean = false
  firstLetters: string[] = []
  alphabetArr: AlphabetObj[] = []
  filteredAlphabetArr: AlphabetObj[] = []
  letter: string = ''

  setShowBlock = () => {
    this.showBlock = !this.showBlock
  }

  getFirstLetters(): void {
    this.data.map((it: AlphabetItem) => {
      if (this.firstLetters.indexOf(it.label.charAt(0)) === -1) {
        this.firstLetters.push(it.label.charAt(0))
        this.firstLetters.sort((a: string,b: string) => {            
          if (a < b) {
          return -1;
          }
          if (a > b) {
          return 1;
          }
          return 0
        })
      }
    })
  }

  ngOnInit(): void {
    this.getFirstLetters()

    const arr: any = []
    this.firstLetters.map((lette: string) => {
      const obj = {letter: lette, items: []}
      arr.push(obj)
    })
    this.data.map(it => {
      this.firstLetters.map((lette: string, index: number) => {
        if (it.label.charAt(0) === lette) {
          arr[index].items.push(it)
        }
      })
    })
    this.alphabetArr = arr
    this.filteredAlphabetArr = arr
  }

  showItems(newItem: string) {
    if (newItem.length === 1) {
      this.filteredAlphabetArr = this.alphabetArr.filter(item => item.letter.toLowerCase() === newItem.toLowerCase())
    } else if (newItem.length === 0) {
      this.filteredAlphabetArr = this.alphabetArr
    }
    else {
      let newArr: any = []
      let pp =  JSON.parse(JSON.stringify(this.alphabetArr))
      pp.map((item: any) => {
        item.items.map((it: any) => {
          if (it.label.toLowerCase().includes(newItem.toLowerCase())) {
            if (!newArr.find((its: any) => its.letter === item.letter)) {
              newArr.push(item)
            }
              newArr.map((it: any) => {
                it.items = it.items.filter((lab: any) => lab.label.toLowerCase().includes(newItem.toLowerCase()))
              })
          }
        })
      })
      this.filteredAlphabetArr = newArr
    }
  }

  onCheckboxChange(changedInput: string) {
    this.alphabetBlockChange.emit(changedInput)
  }

}
