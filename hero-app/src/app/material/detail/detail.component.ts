import { Component, Input } from "@angular/core";
import { DetailComponentOption } from "./class/detail-option.class";


@Component({
    selector: 'mat-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
    @Input() option: DetailComponentOption;

}
