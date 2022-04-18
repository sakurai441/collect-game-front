import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SettingTest } from '../components/test'

describe('settingページのテスト', () => {
  test('render', async () => {
    render(<SettingTest />)
    expect(screen.getByText('変更する')).toBeInTheDocument()
    expect(screen.queryByText(/時間を忘れたい人/)).toBeNull()
    expect(screen.getByRole('textbox', { name: /名前を入れてね/ })).toBeInTheDocument()
  })

  test('clicked event', async () => {
    // render(<SettingTest />)
    const handleClick = jest.fn()
    const { getByText } = render(<button onClick={() => handleClick()}>button</button>)
    fireEvent.click(getByText('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)


    render(<SettingTest />)
    window.alert = jest.fn()
    expect(screen.queryByText(/ゲストユーザーにはなれないよ。/)).toBeNull()

    const button = screen.getByRole('button', { name: '変更する' })
    const inputValue = screen. getByRole("textbox", { name: "名前を入れてね" });
    userEvent.type(inputValue, "ゲストユーザー")
    userEvent.click(button, "変更する")
    expect(window.alert).toHaveBeenCalledWith('ゲストユーザーにはなれないよ。')
  })
})
