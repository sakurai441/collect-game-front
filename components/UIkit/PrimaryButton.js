import Button from '@material-ui/core/Button'

export default function PrimaryButton(props) {
  return (
    <Button
      className="w-3/4 font-bold "
      variant={props.variant}
      color={props.color}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  )
}
