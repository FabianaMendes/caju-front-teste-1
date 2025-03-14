import { render, screen, fireEvent } from '@testing-library/react'
import RegistrationCard from '~/components/RegistrationCard'
import { Status } from '~/types/Admission'

const title = 'Luciano Andrade'
const email = 'luciano@gmail.com'
const admissionDate = '02/01/2025'
const id = 'card'

describe('RegistrationCard Component', () => {
  const props = {
    isLoading: false,
    title,
    email,
    admissionDate,
    id,
    status: Status.REVIEW,
    onReprove: jest.fn(),
    onApprove: jest.fn(),
    onReview: jest.fn(),
    onDelete: jest.fn(),
  }

  it('should render the card with correct information', () => {
    render(<RegistrationCard {...props} />)
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(email)).toBeInTheDocument()
    expect(screen.getByText(admissionDate)).toBeInTheDocument()
  })

  it('should render approve and reprove buttons when status is REVIEW', () => {
    render(<RegistrationCard {...props} />)
    expect(screen.getByTestId('approve-button')).toBeInTheDocument()
    expect(screen.getByTestId('reprove-button')).toBeInTheDocument()
  })

  it('should render review button when status is not REVIEW', () => {
    render(<RegistrationCard {...{ ...props, status: Status.APPROVED }} />)
    expect(screen.getByTestId('review-button')).toBeInTheDocument()
  })

  it('should call onApprove when approve button is clicked', () => {
    render(<RegistrationCard {...props} />)
    fireEvent.click(screen.getByTestId('approve-button'))
    expect(props.onApprove).toHaveBeenCalledTimes(1)
  })

  it('should call onReprove when reprove button is clicked', () => {
    render(<RegistrationCard {...props} />)
    fireEvent.click(screen.getByTestId('reprove-button'))
    expect(props.onReprove).toHaveBeenCalledTimes(1)
  })

  it('should call onReview when review button is clicked', () => {
    render(<RegistrationCard {...{ ...props, status: Status.APPROVED }} />)
    fireEvent.click(screen.getByTestId('review-button'))
    expect(props.onReview).toHaveBeenCalledTimes(1)
  })

  it('should call onDelete when delete button is clicked', () => {
    render(<RegistrationCard {...props} />)
    fireEvent.click(screen.getByTestId('delete-button'))
    expect(props.onDelete).toHaveBeenCalledTimes(1)
  })

  it('should apply correct opacity when isLoading is true', () => {
    render(<RegistrationCard {...{ ...props, isLoading: true }} />)
    expect(screen.getByTestId('registration-card')).toHaveStyle('opacity: 0.5')
  })

  it('should apply correct opacity when isLoading is false', () => {
    render(<RegistrationCard {...props} />)
    expect(screen.getByTestId('registration-card')).toHaveStyle('opacity: 1')
  })
})