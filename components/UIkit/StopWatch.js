import { useStopwatch } from 'react-timer-hook'
import { DeleteButton } from '.'

export default function StopWatch() {
  const { seconds, minutes, hours, days, start, pause } = useStopwatch({ autoStart: false })

  return (
    <div>
      <div className='text-2xl'>
        <h1>あなたがこのゲームを開始してから</h1>
        <span>{days}日</span><span>{hours}時間</span><span>{minutes}分</span><span>{seconds}秒</span>経過しました。
      </div>
      <div className='mt-3 space-x-2'>
      <DeleteButton label={'このゲームを開始する'} variant={'outlined'} color={'warning'} onClick={start} />
      <DeleteButton label={'念のための止めるボタン'} variant={'outlined'} color={'warning'} onClick={pause} />
      </div>
    </div>
  )
}
