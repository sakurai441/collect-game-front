import { Modal } from '@material-ui/core'
import { TextInput, MiniTextArea, MiniPrimaryButton } from '../UIkit'

const EditModal = (props) => {
  const body = (
    <div className="overflow-auto mt-12 bg-white border border-black md:absolute md:top-1/2 md:left-1/2 md:-mt-12 md:-translate-x-1/2 md:-translate-y-1/2">
      <div className="py-40 text-center md:px-40">
        <h1 className="text-3xl ">更新できるよ</h1>
        <div className="mt-5">
          <p className="invisible">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
          <div className="space-y-3">
            <TextInput label={'Title'} type={'text'} onChange={props.onTitle} />
            <MiniTextArea placeholder={'Content'} onChange={props.onContent} />
          </div>
          <div className="mt-5">
            <MiniPrimaryButton label={'更新'} variant={'outlined'} onClick={() => props.onUpdate()} />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal open={props.open} onClose={props.onClose}>
      {body}
    </Modal>
  )
}

export default EditModal
