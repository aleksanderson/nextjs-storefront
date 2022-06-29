import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductOptionTextBox.stories' // import all stories from the stories file

const { Common } = composeStories(stories)
const mockedOnBlur = jest.fn()

const setup = () => {
  render(<Common {...Common.args} onBlur={mockedOnBlur} />)
}

describe('[component] ProductOptionTextBox component', () => {
  it('should render option', () => {
    setup()

    const textbox = screen.getByRole('textbox')

    expect(textbox).toBeInTheDocument()
  })

  it('should show user entered value', () => {
    setup()

    const textbox = screen.getByRole('textbox')
    userEvent.type(textbox, 'Test')
    fireEvent.blur(textbox)

    expect(textbox).toHaveValue('Test')
    expect(mockedOnBlur).toHaveBeenCalled()
  })
})