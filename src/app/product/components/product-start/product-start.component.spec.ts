import { TestBed, async } from '@angular/core/testing';
import { takeWhile } from 'rxjs/operators';

import { ProductStartComponent } from './product-start.component';

describe('Component: Product Start', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductStartComponent]
        });
    });

    it('should create the component', () => {
        let fixture = TestBed.createComponent(ProductStartComponent);
        let component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should render text', () => {
        let fixture = TestBed.createComponent(ProductStartComponent);
        fixture.detectChanges();
        let template: HTMLElement = fixture.debugElement.nativeElement;
        expect(template.querySelector('h3').textContent).toContain('Please select a product to edit!');
    });
});
