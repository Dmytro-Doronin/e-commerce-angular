import { TestBed } from '@angular/core/testing'

import { ProductsApiServiceTsService } from './products-api.service'

describe('ProductsApiServiceTsService', () => {
  let service: ProductsApiServiceTsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ProductsApiServiceTsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
