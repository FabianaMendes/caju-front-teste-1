import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Button, ButtonSmall } from '../../components/Button';

const text = 'Confirmar'

describe('Button Component', () => {
  it('should render the button with children', async () => {
    render(<Button>{text}</Button>)
    await waitFor(() => {
      const button = screen.getByText(text)
      expect(button).toBeInTheDocument()
    })
  })

  it('should render the Loader when isSubmitting is true', () => {
    render(<Button isSubmitting={true}>{text}</Button>)
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
    expect(screen.getByText(text)).toHaveStyle('color: transparent')
  })

  it('should not render the Loader when isSubmitting is false', () => {
    render(<Button isSubmitting={false}>{text}</Button>)
    const loader = screen.queryByTestId('loader')
    expect(loader).toBeNull()
    expect(screen.getByText(text)).toHaveStyle('color: rgb(255, 255, 255)')
  })

  it('should call onClick when the button is clicked', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>{text}</Button>)
    fireEvent.click(screen.getByText(text))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('ButtonSmall Component', () => {
  it('should render the button with children', () => {
    render(<ButtonSmall>{text}</ButtonSmall>)
    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it('should apply background color when bgColor is provided', () => {
    render(<ButtonSmall bgColor="red">{text}</ButtonSmall>)
    expect(screen.getByText(text)).toHaveStyle('background-color: red')
  })

  it('should apply text color when color is provided', () => {
    render(<ButtonSmall color="white">{text}</ButtonSmall>)
    expect(screen.getByText(text)).toHaveStyle('color: white')
  })

  it('should call onClick when the button is clicked', () => {
    const onClick = jest.fn()
    render(<ButtonSmall onClick={onClick}>{text}</ButtonSmall>)
    fireEvent.click(screen.getByText(text))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})