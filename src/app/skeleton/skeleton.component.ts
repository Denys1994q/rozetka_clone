import { Component, Input } from '@angular/core';
import { DeviceService } from '../core/services/device.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.sass']
})
export class SkeletonComponent {
    @Input() variant!: string

    constructor(public deviceService: DeviceService) {}

}
