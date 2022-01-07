- users マスタ

  - id［PK］
  - name
  - email
  - password

- workspaces マスタ

  - id［PK］
  - value

- channels マスタ（依存）

  - id［PK］
  - workspace_id［FK］
  - value

- messages マスタ（依存）

  - id［PK］
  - channel_id［FK］
  - user_id［FK］
  - mention_to_user_id［FK］
  - sended_at
  - value

- thread_relationships（関係性）

  - id［PK］
  - parent_message_id［FK］
  - child_message_id［FK］

- channel_attendees（関係性）

  - id［PK］
  - user_id［FK］
  - channel_id［FK］

- workspace_attendees（関係性）
  - id［PK］
  - user_id［FK］
  - workspace_id［FK］
  - role
