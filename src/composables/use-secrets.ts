import { useLocalStorage } from "@vueuse/core"

export const useSecrets = () => {
  const clientId = useLocalStorage('twir_tokens_generator_client_id', '')
  const clientSecret = useLocalStorage('twir_tokens_generator_client_secret', '')
  
  return {
    clientId,
    clientSecret,
  }
}