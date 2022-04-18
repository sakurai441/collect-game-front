import Button from '@material-ui/core/Button';


export default function DeleteButton(props) {
  return (
      <Button className="font-bold " variant={props.variant} color={props.color}  onClick={() => props.onClick()}>
        {props.label}
      </Button>
  );
}