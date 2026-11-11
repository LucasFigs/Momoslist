import { unstable_rethrow } from "next/navigation";
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
      message: error instanceof Error ? error.name : "UnexpectedError",
      code:
        typeof error === "object" && error && "code" in error
          ? String(error.code).slice(0, 30)
          : undefined,
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
      }),
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
  context?: LogContext,
): Promise<T | { success: false; error: string }> {
  try {
    return await fn();
  } catch (error) {
    unstable_rethrow(error);
    logger.error(scope, error, context);
    return { success: false, error: GENERIC_ERROR_MESSAGE };
  }
}
