import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/icon';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const SUGGESTED_QUESTIONS = [
  'What documents do I need for a passport?',
  'How do I start a business in Bangladesh?',
  'What is the fee for a driving licence?',
  'How do I check my application status?',
];

type Message = {
  id: string;
  from: 'user' | 'assistant';
  text: string;
};

export default function AssistantScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { id: `${Date.now()}`, from: 'user', text: trimmed }]);
    setDraft('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top}>
      <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing.two }]}>
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <View style={[styles.iconWrap, { backgroundColor: theme.successSoft }]}>
              <Icon name="sparkle" color={theme.primary} size={16} weight="fill" />
            </View>
            <View>
              <ThemedText type="smallBold">Citizen Assistant</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Not connected yet
              </ThemedText>
            </View>
          </View>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Icon name="close" color={theme.text} size={20} />
          </Pressable>
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <ThemedText type="default" style={styles.emptyTitle}>
                Ask about any public service
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyDescription}>
                Citizen Assistant isn&apos;t connected to a real AI yet. Try one of these to see how it will
                work.
              </ThemedText>
              <View style={styles.suggestions}>
                {SUGGESTED_QUESTIONS.map((question) => (
                  <Pressable
                    key={question}
                    onPress={() => sendMessage(question)}
                    style={({ pressed }) => [
                      styles.suggestionRow,
                      { borderColor: theme.border, opacity: pressed ? 0.6 : 1 },
                    ]}>
                    <ThemedText type="small">{question}</ThemedText>
                    <Icon name="chevronRight" color={theme.textSecondary} size={14} />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : (
            messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.bubble,
                  message.from === 'user'
                    ? { alignSelf: 'flex-end', backgroundColor: theme.primary }
                    : { alignSelf: 'flex-start', backgroundColor: theme.backgroundElement },
                ]}>
                <ThemedText type="small" themeColor={message.from === 'user' ? 'primaryText' : 'text'}>
                  {message.text}
                </ThemedText>
              </View>
            ))
          )}

          {messages.length > 0 && (
            <View style={[styles.bubble, styles.notice, { borderColor: theme.border }]}>
              <ThemedText type="small" themeColor="textSecondary">
                Citizen Assistant isn&apos;t connected to a real AI yet, so it can&apos;t reply. This is a
                preview of the chat experience.
              </ThemedText>
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputRow, { borderColor: theme.border, paddingBottom: insets.bottom + Spacing.two }]}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Ask anything about services..."
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text }]}
            multiline
          />
          <Pressable
            onPress={() => sendMessage(draft)}
            disabled={!draft.trim()}
            style={[styles.sendButton, { backgroundColor: draft.trim() ? theme.primary : theme.backgroundElement }]}>
            <Icon name="send" color={draft.trim() ? theme.primaryText : theme.textSecondary} size={16} />
          </Pressable>
        </View>
        <ThemedText type="small" themeColor="textSecondary" style={styles.disclaimer}>
          AI responses can make mistakes. Verify important info.
        </ThemedText>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.three,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  emptyState: {
    marginTop: Spacing.five,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 700,
  },
  emptyDescription: {
    marginTop: Spacing.one,
    marginBottom: Spacing.four,
  },
  suggestions: {
    gap: Spacing.two,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: Radius.large,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
  },
  notice: {
    alignSelf: 'stretch',
    maxWidth: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.three,
  },
  input: {
    flex: 1,
    fontSize: 15,
    maxHeight: 96,
    paddingVertical: Spacing.two,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 11,
    marginBottom: Spacing.two,
  },
});
