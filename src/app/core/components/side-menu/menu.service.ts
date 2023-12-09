import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class MenuService {
    openedMenu:Subject<string> = new Subject<string>();
    open:Subject<boolean> = new Subject<boolean>();
    
    openMenu(val: string) {
        this.open.next(true)
        this.openedMenu.next(val)
    }
    
    closeMenu() {
        this.open.next(false)
    }
}