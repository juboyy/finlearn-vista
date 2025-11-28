import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UsePodcastProgressProps {
  podcastId: string;
  podcastTitle: string;
  podcastTopic: string;
  podcastImage: string;
  episodeNumber: number;
  currentTimeSeconds: number;
  totalDurationSeconds: number;
  isPlaying: boolean;
}

export function usePodcastProgress({
  podcastId,
  podcastTitle,
  podcastTopic,
  podcastImage,
  episodeNumber,
  currentTimeSeconds,
  totalDurationSeconds,
  isPlaying,
}: UsePodcastProgressProps) {
  const lastSavedTime = useRef(0);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveProgress = async () => {
    // Avoid saving too frequently (at least 5 seconds difference)
    if (Math.abs(currentTimeSeconds - lastSavedTime.current) < 5) {
      return;
    }

    const progressPercentage = Math.round(
      (currentTimeSeconds / totalDurationSeconds) * 100
    );

    try {
      // Check if entry exists
      const { data: existingEntry } = await supabase
        .from("user_podcast_history")
        .select("id")
        .eq("podcast_id", podcastId)
        .maybeSingle();

      if (existingEntry) {
        // Update existing entry
        await supabase
          .from("user_podcast_history")
          .update({
            current_time_seconds: currentTimeSeconds,
            progress_percentage: progressPercentage,
            last_played_at: new Date().toISOString(),
          })
          .eq("id", existingEntry.id);
      } else {
        // Insert new entry
        await supabase.from("user_podcast_history").insert({
          podcast_id: podcastId,
          podcast_title: podcastTitle,
          podcast_topic: podcastTopic,
          podcast_image: podcastImage,
          episode_number: episodeNumber,
          current_time_seconds: currentTimeSeconds,
          progress_percentage: progressPercentage,
          total_duration_seconds: totalDurationSeconds,
        });
      }

      lastSavedTime.current = currentTimeSeconds;
      console.log(
        `Progress saved: ${progressPercentage}% at ${currentTimeSeconds}s`
      );
    } catch (error) {
      console.error("Error saving podcast progress:", error);
    }
  };

  // Save progress periodically while playing
  useEffect(() => {
    // Clear any existing intervals/timeouts
    if (saveIntervalRef.current) {
      clearInterval(saveIntervalRef.current);
      saveIntervalRef.current = null;
    }
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }

    if (isPlaying && currentTimeSeconds > 0) {
      // Save immediately when starting playback
      saveProgress();

      // Set up interval to save every 10 seconds
      saveIntervalRef.current = setInterval(() => {
        saveProgress();
      }, 10000);
    } else if (!isPlaying && currentTimeSeconds > 0) {
      // Save progress when pausing (debounced)
      saveTimeoutRef.current = setTimeout(() => {
        saveProgress();
      }, 500);
    }

    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [isPlaying, currentTimeSeconds, podcastId, podcastTitle, podcastTopic, podcastImage, episodeNumber, totalDurationSeconds]);

  // Save progress when component unmounts (user leaves page)
  useEffect(() => {
    return () => {
      if (currentTimeSeconds > 0) {
        // Use a synchronous save on unmount
        const progressPercentage = Math.round(
          (currentTimeSeconds / totalDurationSeconds) * 100
        );

        supabase
          .from("user_podcast_history")
          .select("id")
          .eq("podcast_id", podcastId)
          .maybeSingle()
          .then(({ data: existingEntry }) => {
            if (existingEntry) {
              return supabase
                .from("user_podcast_history")
                .update({
                  current_time_seconds: currentTimeSeconds,
                  progress_percentage: progressPercentage,
                  last_played_at: new Date().toISOString(),
                })
                .eq("id", existingEntry.id);
            } else {
              return supabase.from("user_podcast_history").insert({
                podcast_id: podcastId,
                podcast_title: podcastTitle,
                podcast_topic: podcastTopic,
                podcast_image: podcastImage,
                episode_number: episodeNumber,
                current_time_seconds: currentTimeSeconds,
                progress_percentage: progressPercentage,
                total_duration_seconds: totalDurationSeconds,
              });
            }
          });
      }
    };
  }, []);

  return { saveProgress };
}

