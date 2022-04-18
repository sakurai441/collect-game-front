import { render, screen } from '@testing-library/react'
import { NewTest } from '../components/test'
import userEvent from '@testing-library/user-event'

describe('新規投稿ページのテスト', () => {
  test('アラートのテスト', () => {
    render(<NewTest />)

    expect(screen.queryByText(/タイトルは入力してね。/)).toBeNull()
    expect(screen.queryByText(/255字以下でお願いします┌○ﾍﾟｺﾘ/)).toBeNull()

    window.alert = jest.fn()
    const title = screen.getByLabelText('Title')
    const content = screen.getByLabelText('minimum height')
    const button = screen.getByRole('button', { name: 'ゲームを追加する' })

    userEvent.type(content, 'ゲームしたい')
    userEvent.click(button, 'ゲームを追加する')
    expect(window.alert).toHaveBeenCalledWith('タイトルは入力してね。')

    userEvent.type(title, 'over')
    userEvent.type(content, 'ゲームしたいゲームしたいゲームしたいゲームしたいゲームしたいゲームしたいゲームしたい')
    userEvent.click(button, 'ゲームを追加する')
    expect(screen.queryByText(/255字以下でお願いします┌○ﾍﾟｺﾘ/)).toBeNull()
  })

  test('画像の存在テスト', () => {
    render(<NewTest />)

    expect(screen.getByText(/※サンプル画像です/)).toBeInTheDocument()
    expect(screen.getByLabelText('upload picture')).toBeInTheDocument()

    window.URL.createObjectURL = jest.fn()
    const file = new File(['sample'], 'sample.png', { type: 'sample.png' })
    const input = screen.getByTestId('custom-element')

    expect(input).toBeInTheDocument()
    userEvent.upload(input, file)
    expect(input.files[0]).toStrictEqual(file)
    expect(input.files.item(0)).toStrictEqual(file)
    expect(input.files).toHaveLength(1)
  })
})
