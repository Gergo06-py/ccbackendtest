import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3).trim(),
    lastName: vine.string().minLength(3).trim(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      })
      .trim(),
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      .confirmed(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    password: vine.string(),
  })
)

export const modifyAccountValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3).trim().optional(),
    lastName: vine.string().minLength(3).trim().optional(),
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      .optional(),
  })
)

registerValidator.messagesProvider = new SimpleMessagesProvider({
  'firstName.required': 'A keresztnév megadása kötelező',
  'firstName.string': 'A keresztnévnek szövegnek kell lennie',
  'firstName.minLength': 'A keresztnévnek tartalmaznia kell minimum {{ min }} karaktert',
  'lastName.required': 'A vezetéknév megadása kötelező',
  'lastName.string': 'A vezetéknévnek szövegnek kell lennie',
  'lastName.minLength': 'A vezetéknévnek tartalmaznia kell minimum {{ min }} karaktert',
  'email.required': 'Az email cím megadása kötelező',
  'email.string': 'Az email címnek szövegnek kell lennie',
  'email.email': 'Az email cím formátuma nem megfelelő',
  'database.unique': 'A megadott e-mail címmel már van regisztrálva fiók',
  'password.required': 'A jelszó megadása kötelező',
  'password.string': 'A jelszónak szövegnek kell lennie',
  'password.minLength': 'A jelszónak tartalmaznia kell minimum {{ min }} karaktert',
  'password.regex':
    'A jelszónak tartalmaznia kell minimum egy kisbetűt, egy nagybetűt és egy számot',
  'password.confirmed': 'A jelszavak nem egyeznek meg',
})

loginValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'Az email cím megadása kötelező',
  'email.string': 'Az email címnek szövegnek kell lennie',
  'password.required': 'A jelszó megadása kötelező',
  'password.string': 'A jelszónak szövegnek kell lennie',
})

modifyAccountValidator.messagesProvider = new SimpleMessagesProvider({
  'firstName.string': 'A keresztnévnek szövegnek kell lennie',
  'firstName.minLength': 'A keresztnévnek tartalmaznia kell minimum {{ min }} karaktert',
  'lastName.string': 'A vezetéknévnek szövegnek kell lennie',
  'lastName.minLength': 'A vezetéknévnek tartalmaznia kell minimum {{ min }} karaktert',
  'password.string': 'A jelszónak szövegnek kell lennie',
  'password.minLength': 'A jelszónak tartalmaznia kell minimum {{ min }} karaktert',
  'password.regex':
    'A jelszónak tartalmaznia kell minimum egy kisbetűt, egy nagybetűt és egy számot',
})
