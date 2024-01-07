



type LoadingProps = {
    message? : string;
}

const Loading = ({message}: LoadingProps) => {
  return (
    <div>
        {message && <p>{message}</p>}
    </div>
  )
}

export default Loading;