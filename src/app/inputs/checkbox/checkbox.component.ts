import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/modals/modal.service';
import { SearchResultsService } from 'src/app/search/services/search-results.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass']
})
export class CheckboxComponent {
  constructor(private modalService: ModalService, public SearchResultsService: SearchResultsService) {}
  @Input() label!: string 
  @Input() auth!: boolean
  @Input() services!: boolean
  @Input() variant!: string 
  @Input() search!: boolean
  @Input() searchId: string = ''
  @Input() allChecked!: boolean
  @Output() checkboxChange = new EventEmitter<string>();

  service: boolean = false

  onCheck(e: any) {
    this.service = e.target.checked
  }

  openDialog() {
    this.modalService.closeDialog()
    this.modalService.openDialog('services')
  }

  getValue(e: any, label: string) {
    this.checkboxChange.emit(label)
    if (!e.target.checked) {
      this.SearchResultsService.removeOne(label)
    }
  }

  checkIfActive(input: any) {
    return this.SearchResultsService.selectedInputs.find(k => k.options.find((s: any) => s.label === input))
  }
}
