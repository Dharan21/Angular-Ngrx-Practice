import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductMainComponent } from './product-main.component';
import { State } from 'src/app/store/reducers/product.reducer';
import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { Product } from 'src/app/shared/models/product.model';

describe('Component: ProductMain', () => {
    let store: MockStore;
    const initialState: State = { products: [], cartItems: [] };
    let fixture: ComponentFixture<ProductMainComponent>;
    let component: DebugElement;
    let componentTS: ProductMainComponent;
    let componentHTML: HTMLElement;

    beforeEach(() => {
        const productApiServiceStub = () => ({
            fetchProducts: () => ({ subscribe: () => ({}) })
        });
        TestBed.configureTestingModule({
            declarations: [ProductMainComponent],
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: ProductApiService,
                    useFactory: productApiServiceStub
                },
                provideMockStore({ initialState })]
        });
        fixture = TestBed.createComponent(ProductMainComponent);
        componentTS = fixture.debugElement.componentInstance;
        componentHTML = fixture.debugElement.nativeElement;
        store = TestBed.inject(MockStore);
    });

    it('should create the app', () => {
        expect(componentTS).toBeTruthy();
    });

    it('fetch data if not fetched from server', () => {
        store.overrideSelector('state', { products: [] });
        let apiService = fixture.debugElement.injector.get(ProductApiService);
        let spy = spyOn(apiService, 'fetchProducts');
            // .and.returnValue(new Observable((subscriber) => {
            //     setInterval(() => { subscriber.next([new Product('Test', 'TestImage', 10, 10, 1)]); }, 1000);
            // }));
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('do not fetch data if in store', () => {
        store.overrideSelector('state', { products: [new Product('Test', 'TestImage', 10, 10, 1)] });
        let apiService = fixture.debugElement.injector.get(ProductApiService);
        let spy = spyOn(apiService, 'fetchProducts');
            // .and.returnValue(new Observable((subscriber) => {
            //     setInterval(() => { subscriber.next([new Product('Test', 'TestImage', 10, 10, 1)]); }, 1000);
            // }));
        fixture.detectChanges();
        expect(spy).not.toHaveBeenCalled();
    });
});
