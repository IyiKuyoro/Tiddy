CREATE PROCEDURE remove_watcher_procedure(watcher_id_param INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Delete all message reaction counts
  DELETE FROM message_reaction_counts WHERE watching_channels_id = watcher_id_param;
  -- Delete watcher for
  DELETE FROM watching_channels
  WHERE
    id = watcher_id_param;
END;
$$;
