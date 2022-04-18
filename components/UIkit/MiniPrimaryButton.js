import Button from '@material-ui/core/Button';


export default function MiniPrimaryButton(props) {
  return (
      <Button className="w-2/5 font-bold " color={props.color} variant={props.variant}  onClick={() => props.onClick()}>
        {props.label}
      </Button>
  );
}