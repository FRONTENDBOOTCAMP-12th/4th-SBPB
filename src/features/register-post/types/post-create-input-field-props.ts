export interface PostCreateInputProps {
  label: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  type?: 'text' | 'textarea'
  placeholder?: string
  customClass: string
  textLimit?: 20
  isVisible?: string
}
