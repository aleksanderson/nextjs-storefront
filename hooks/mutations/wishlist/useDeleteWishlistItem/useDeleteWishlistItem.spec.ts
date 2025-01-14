import { renderHook } from '@testing-library/react-hooks'

import { useDeleteWishlistItem } from './useDeleteWishlistItem'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockWishlist = wishlistMock.items[0]

const deleteWishlistItemInput = {
  product: {
    productCode: 'MS-BTL-005',
    isPackagedStandAlone: true,
    variationProductCode: 'MS-BTL-005',
    options: [],
  },
  currentWishlist: mockWishlist,
}

describe('[hooks] useDeleteWishlistItem', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should remove wishlist item from wishlist page', async () => {
    const { result } = renderHook(
      () => useDeleteWishlistItem({ isRemovedFromWishlist: true, delay: 1000 }),
      { wrapper: createQueryClientWrapper() }
    )
    const response = await result.current.deleteWishlistItem.mutateAsync(deleteWishlistItemInput)
    expect(response).toBeTruthy()
  })
})
