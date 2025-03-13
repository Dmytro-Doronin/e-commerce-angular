import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CartStrokeIconComponent } from './cart-stroke-icon.component'

describe('CartStrokeIconComponent', () => {
  let component: CartStrokeIconComponent
  let fixture: ComponentFixture<CartStrokeIconComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartStrokeIconComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CartStrokeIconComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
