export default function ProfileCard(user: {
  name: string;
  email: string;
  image: string;
}) {
  let maxString = user.name.length > user.email.length ? user.name.length : user.email.length;
  let containerWidth = "~~~~~~~~~~~~~~~~";
  for (let i = 0; i < maxString; i++) {
    containerWidth += "~";
  }
  let username = user.name.length < containerWidth.length ? `${containerWidth.substring(0, ((containerWidth.length - user.name.length) / 2))}${user.name}${containerWidth.substring(0, ((containerWidth.length - user.name.length) / 2))}` : user.name;
  let email = user.email.length < containerWidth.length ? `${containerWidth.substring(0, ((containerWidth.length - user.email.length) / 2))}${user.email}${containerWidth.substring(0, ((containerWidth.length - user.email.length) / 2))}` : user.email;

  return [
    containerWidth,
    username,
    email,
    containerWidth,
  ]
}
