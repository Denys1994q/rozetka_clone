import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-cabinet-personalInfo',
  templateUrl: './cabinet-personalInfo.component.html',
  styleUrls: ['./cabinet-personalInfo.component.sass']
})
export class CabinetPersonalInfoPage {
    selectedIdxs: number[] = []
    selectedIdxsToEdit: number[] = []
    userData!: any
    data!: any
    // inputs
    surname: string | undefined = ''
    name: string | undefined = ''
    middleName: string | undefined = ''
    sex: string | undefined = ''
    dateOfBirth!: Date 
    email: string | undefined = ''
    phone: string | undefined = ''
    
    constructor( private authService: AuthService) {}

    ngOnInit() {
        this.authService.userData$.subscribe(userData => {
            this.userData = userData
            this.name = userData?.name
            this.surname = userData?.surname
            this.middleName = userData?.middleName
            this.sex = userData?.sex
            this.dateOfBirth = new Date(userData?.dateOfBirth)  
            this.email = userData?.email
            this.phone = userData?.phone

            this.data = [
                {
                    icon: 'person',
                    heading: 'Особисті дані',
                    list: [
                        {title: 'Прізвище', inputName: 'surname', text: this.userData && this.userData.surname ? this.userData.surname : 'Не вказано'},
                        {title: 'Ім`я', inputName: 'name', text: this.userData && this.userData.name ? this.userData.name : 'Не вказано'},
                        {title: 'По-батькові', inputName: 'middleName', text: this.userData && this.userData.middleName ? this.userData.middleName : 'Не вказано'},
                        {title: 'Дата народження', text: this.userData && this.userData.dateOfBirth ? this.userData.dateOfBirth : 'Не вказано'},
                        {title: 'Стать', inputName: 'sex', text: this.userData && this.userData.sex ? this.userData.sex : 'Не вказано'}
                    ]
                },
                {
                    icon: 'mail_outline',
                    heading: 'Контакти',
                    list: [
                        {title: 'Підтверджений телефон', inputName: 'phone', text: this.userData && this.userData.phone ? this.userData.phone : 'Не вказано'},
                        {title: 'Електронна пошта', inputName: 'email', text: this.userData && this.userData.email ? this.userData.email : 'Не вказано'}
                    ]
                }
            ]
        })
    }

    showInfo(index: number) {
        if (this.selectedIdxs.indexOf(index) === -1) {
            this.selectedIdxs.push(index)
        } else {
            this.selectedIdxs = this.selectedIdxs.filter(i => i !== index)
        }
    }

    editInfo(index: number) {
        if (this.selectedIdxsToEdit.indexOf(index) === -1) {
            this.selectedIdxsToEdit.push(index)
        } else {
            this.selectedIdxsToEdit = this.selectedIdxsToEdit.filter(i => i !== index)
        }
    }

    updateUser() {
            const newUserData = {
                name: this.name,
                surname: this.surname,
                middleName: this.middleName,
                sex: this.sex,
                dateOfBirth: this.dateOfBirth,
                phone: this.phone,
                email: this.email,
            }
    
        this.authService.updateUser(newUserData).subscribe({
            next: resp => {        
                this.authService.userDataSubject.next(newUserData)
            },
            error: err => console.log(err) 
        })
    }

    disableBtn(heading: string) {
        if (heading === 'Особисті дані') {
            const dateOfBirthFromDatabase = new Date(this.userData.dateOfBirth)
            return (
                this.userData.name === this.name &&
                this.userData.surname === this.surname &&
                this.userData.middleName === this.middleName &&
                this.userData.sex === this.sex &&
                dateOfBirthFromDatabase.getTime() === this.dateOfBirth.getTime()
            );
        } else if (heading === 'Контакти') {
            return (
                this.userData.phone === this.phone &&
                this.userData.email === this.email 
            );
        } else {
            return true
        }

    }

    onFilterChange(value: any) {
        this.sex = value
    }

    updateDate(event: any) {
        this.dateOfBirth = new Date(event); 
    }

    logout() {
        this.authService.logout().subscribe({
            next: () => {},
            error: error => console.error('Помилка при виконанні запиту:', error)
        })
    }

    deleteAccount() {
        this.authService.deleteUser().subscribe({
            next: () => {},
            error: error => console.error('Помилка при виконанні запиту:', error)
        })
    }

}