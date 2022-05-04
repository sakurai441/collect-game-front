import Image from 'next/image'

export default function ResHeader() {
  return (
    <div className="visible md:invisible">
      <div className="flex justify-center space-x-3">
        <Image src={'/images/logo5.png'} width={30} height={30} alt="logoだよ" />
        <Image src={'/images/title.png'} width={175} height={15} alt="logoだよ" />
      </div>
    </div>
  )
}
