import { render, screen } from '@testing-library/react'
import Header from '~/components/Header'

describe('Header Component', () => {
  const text = 'Meu Cabeçalho'

  it('should render header with the correct text', () => {
    render(<Header text={text} />)
    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it('should apply the correct background gradient', () => {
    render(<Header text={text} />)
    const header = screen.getByTestId('header')
    expect(header).toHaveStyle(`
      background: linear-gradient(
        258deg,
        rgba(255, 117, 0, 1) 8%,
        rgba(232, 5, 55, 1) 53%
      )
    `)
  })

  it('should apply the correct text color', () => {
    render(<Header text={text} />)
    const heading = screen.getByText(text)
    expect(heading).toHaveStyle('color: #fff')
  })

  it('should have the correct height and width', () => {
    render(<Header text={text} />)
    const header = screen.getByTestId('header')
    expect(header).toHaveStyle('width: 100%')
    expect(header).toHaveStyle('height: 64px')
  })

  it('should be fixed at the top of the viewport', () => {
    render(<Header text={text} />)
    const header = screen.getByTestId('header')
    expect(header).toHaveStyle('position: fixed')
    expect(header).toHaveStyle('top: 0')
  })

  it('should have correct padding', () => {
    render(<Header text={text} />)
    const header = screen.getByTestId('header')
    expect(header).toHaveStyle('padding: 0px 24px')
  })
})