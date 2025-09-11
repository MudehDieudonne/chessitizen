// app/+not-found.tsx
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold">404 - Page Not Found</Text>
      <Link href="/" className="mt-2 text-blue-600">
        Go back home
      </Link>
    </View>
  );
}
