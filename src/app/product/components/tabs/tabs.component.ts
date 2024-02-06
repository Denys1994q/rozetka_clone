import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.sass']
})
export class TabsComponent {
    @Input() data!: any[]
    @Input() startRoute!: string
    unsubscribe$ = new Subject<void>()

    constructor(public productService: ProductService, private router: Router) {}

    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe((event: any) => {
            const lastLetterBeforeId = event.url.lastIndexOf('/')
            const tabName = event.url.slice(lastLetterBeforeId+1, lastLetterBeforeId+event.url.length-1)
            if (this.data) {
                this.data.map((item, index) => {
                    if (item.link === tabName) {
                        this.productService.setTab(index)
                    } else if (item.link === '') {
                        this.productService.setTab(0)
                    }
                })
            }
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

}
