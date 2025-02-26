import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SuggestionCategoriesComponent } from './suggestion-categories.component'

describe('SuggestionCategoriesComponent', () => {
  let component: SuggestionCategoriesComponent
  let fixture: ComponentFixture<SuggestionCategoriesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionCategoriesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SuggestionCategoriesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
