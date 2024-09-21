import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { getSavedPosts } from "../../lib/appwrite";
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";

interface Query {
  query?: string;
}

const Saved = () => {
  const { query }: Query = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => getSavedPosts());

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="text-2xl font-psemibold text-white">
                Saved Videos
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput placeholder="Search your saved videos" refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No saved videos found"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Saved;
