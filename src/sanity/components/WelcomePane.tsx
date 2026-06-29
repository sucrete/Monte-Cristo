import { useCurrentUser } from 'sanity';
import { Flex, Card, Stack, Heading, Text } from '@sanity/ui';

export function WelcomePane() {
  const user = useCurrentUser();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <Flex
      align="center"
      justify="center"
      height="fill"
      style={{
        backgroundImage: 'url(/images/sanity/3d-circles.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <Card padding={6} style={{ backgroundColor: 'transparent', background: 'transparent' }}>
        <Stack space={4} style={{ textAlign: 'center' }}>
          <Heading size={4}>Welcome back, {firstName}.</Heading>
          <Text muted size={2}>
            Select a document from the sidebar to get started.
          </Text>
        </Stack>
      </Card>
    </Flex>
  );
}
