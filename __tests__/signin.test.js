import { render, screen } from '@testing-library/react'
import { SignInTest } from '../components/test'
import userEvent from '@testing-library/user-event'

test('サインインページのテスト', () => {
  render(<SignInTest />)

  expect(screen.queryByText(/必須項目が未入力です。/)).toBeNull()

  window.alert = jest.fn()
  const button = screen.getByRole('button', { name: 'さいんいんするよ！' })

  userEvent.click(button, 'さいんいんするよ！')
  expect(window.alert).toHaveBeenCalledWith('必須項目が未入力です。')
})
