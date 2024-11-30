// src/lib/hooks/useChat.js
'use client';

import { useState, useEffect } from 'react';
import { sessionApi } from '@/lib/api/session';

export function useChat() {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await sessionApi.getSessionHistory();
      setSessions(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = async (topic) => {
    try {
      setLoading(true);
      const response = await sessionApi.startSession(topic);
      setCurrentSession(response);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sessions,
    currentSession,
    loading,
    error,
    loadSessions,
    startNewSession,
  };
}