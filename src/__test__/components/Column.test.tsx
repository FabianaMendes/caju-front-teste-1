import { render, screen, waitFor } from '@testing-library/react'
import Column from '~/components/Column'
import { Status } from '~/types/Admission'

const child = 'coluna teste'

describe('Column Component', () => {
  it('should render the column with children', async () => {
    render(<Column title="Sucesso" status={Status.APPROVED}>{child}</Column>)
    await waitFor(() => {
      expect(screen.getByText(child)).toBeInTheDocument()
    })
  })

  it('should apply correct background color based on status', () => {
    render(<Column title="Sucesso" status={Status.APPROVED}>{child}</Column>)
    const column = screen.getByTestId('column-APPROVED')
    expect(column).toHaveStyle('background-color: #EEEEFD')
  })

  it('should apply correct title color based on status', () => {
    render(<Column title="Sucesso" status={Status.APPROVED}>{child}</Column>)
    const title = screen.getByTestId('column-title-APPROVED')
    expect(title).toHaveStyle('color: #4242DF')
  })

  it('should render columns with different statuses', () => {
    render(
      <>
        <Column title="Revisão" status={Status.REVIEW}>{child}</Column>
        <Column title="Reprovado" status={Status.REPROVED}>{child}</Column>
      </>
    )

    expect(screen.getByTestId('column-REVIEW')).toHaveStyle('background-color: #FDF8E9')
    expect(screen.getByTestId('column-title-REVIEW')).toHaveStyle('color: #EFC24D')

    expect(screen.getByTestId('column-REPROVED')).toHaveStyle('background-color: #FBEDF6')
    expect(screen.getByTestId('column-title-REPROVED')).toHaveStyle('color: #CE2893')
  })
})