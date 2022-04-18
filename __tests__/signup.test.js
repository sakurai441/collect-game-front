import { render, screen } from '@testing-library/react'
import { SignUpTest } from '../components/test'
import userEvent from '@testing-library/user-event'

test('サインアップページのテスト', () => {
  render(<SignUpTest />)

  expect(screen.queryByText(/パスワードが一致しません。もう一度入力してください。/)).toBeNull()
  expect(screen.queryByText(/必須項目が未入力です。/)).toBeNull()
  expect(screen.queryByText(/パスワードは六文字以上でお願いします。/)).toBeNull()

  window.alert = jest.fn()
  const email = screen.getByRole('textbox', { name: 'Email' })
  const password = screen.getByLabelText('Password')
  const confirmPassword = screen.getByLabelText('ConfirmPassword')
  const button = screen.getByRole('button', { name: 'アカウントを作成する' })

  userEvent.click(button, 'アカウントを作成する')
  expect(window.alert).toHaveBeenCalledWith('必須項目が未入力です。')

  userEvent.type(email, "example.com")
  userEvent.type(password, "example")
  userEvent.type(confirmPassword, "Example")
  userEvent.click(button, 'アカウントを作成する')
  expect(window.alert).toHaveBeenCalledWith("パスワードが一致しません。もう一度入力してください。")

})
