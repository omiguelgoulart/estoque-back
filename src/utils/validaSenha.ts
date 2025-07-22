export function validaSenha(senha: string): string | true {
  if (senha.length < 6) return 'Senha deve ter no mínimo 6 caracteres'
  if (!/[A-Z]/.test(senha)) return 'Senha deve conter pelo menos uma letra maiúscula'
  if (!/[a-z]/.test(senha)) return 'Senha deve conter pelo menos uma letra minúscula'
  if (!/[0-9]/.test(senha)) return 'Senha deve conter pelo menos um número'
  if (!/[^a-zA-Z0-9]/.test(senha)) return 'Senha deve conter pelo menos um caractere especial'
  return true
}
