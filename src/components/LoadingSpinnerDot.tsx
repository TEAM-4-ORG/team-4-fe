export default function LoadingSpinnerDot() {
  return (
    <div className='flex items-center justify-center space-x-1'>
      <div className='bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]' />
      <div className='bg-muted-foreground h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]' />
      <div className='bg-muted-foreground h-2 w-2 animate-bounce rounded-full' />
    </div>
  );
}
