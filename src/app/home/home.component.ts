import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from '../product';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
	//products = [];
	products: Product[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private apiService: ApiService) { }

	ngOnInit() {
    this.apiService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: Product[])=>
    {
			console.log(data);
			this.products = data;
		})
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
