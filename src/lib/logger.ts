/**
 * Observabilidade mínima (seções 37 e 38 do documento):
 * detalhes técnicos vão para o log do servidor, o usuário recebe uma
 * mensagem amigável. Estrutura pronta para plugar um serviço externo
 * (Sentry, Axiom etc.) depois, sem mexer nas Server Actions.
 */

export const GENERIC_ERROR_MESSAGE =
  "Não foi possível concluir essa ação. Tente novamente.";

type LogContext = Record<string, unknown>;

export const logger = {
  error(scope: string, error: unknown, context?: LogContext) {
    const payload = {
      level: "error",
      scope,
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      ...context,
    };
    console.error(JSON.stringify(payload));
  },

  info(scope: string, message: string, context?: LogContext) {
    console.log(
      JSON.stringify({
        level: "info",
        scope,
        timestamp: new Date().toISOString(),
        message,
        ...context,
      })
    );
  },
};

/**
 * Envolve uma Server Action: erros inesperados são logados no servidor e o
 * usuário recebe apenas a mensagem genérica — nunca um PrismaClientKnownRequestError.
 */
export async function withErrorHandling<T>(
  scope: string,
  fn: () => Promise<T>,
  context?: LogContext
): Promise<T | { success: false; error: string }> {
  try {
    return await fn();
  } catch (error) {
    logger.error(scope, error, context);
    return { success: false, error: GENERIC_ERROR_MESSAGE };
  }
}
