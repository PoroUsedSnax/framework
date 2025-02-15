import { err, ok, Result } from '@sapphire/result';
import { Identifiers } from '../errors/Identifiers';

export function resolveString(
	parameter: string,
	options?: { minimum?: number; maximum?: number }
): Result<string, Identifiers.ArgumentStringTooShort | Identifiers.ArgumentStringTooLong> {
	if (typeof options?.minimum === 'number' && parameter.length < options.minimum) {
		return err(Identifiers.ArgumentStringTooShort);
	}

	if (typeof options?.maximum === 'number' && parameter.length > options.maximum) {
		return err(Identifiers.ArgumentStringTooLong);
	}

	return ok(parameter);
}
