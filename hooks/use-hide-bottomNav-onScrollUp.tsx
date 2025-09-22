import {useCallback, useRef, useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useAppDispatch} from './use-app-dispatch';
import {setHideNav} from '../../features/homeBottomNavigation/homeBottomNavSlice';
import {useFocusEffect} from '@react-navigation/native';

const useHideBottomNavOnScrollUp = () => {
  const scrollViewRef = useRef(null);
  let lastOffsetY = 50;

  const dispatch = useAppDispatch();

  const [isScrolling, setIsScrolling] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsScrolling(false);
        lastOffsetY = 50;
        dispatch(setHideNav(false));
      };
    }, [scrollViewRef]),
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (lastOffsetY <= 0) {
        lastOffsetY = 0;
        setIsScrolling(false);
        dispatch(setHideNav(false));
      }
      const currentOffsetY = event.nativeEvent.contentOffset.y;

      if (currentOffsetY < lastOffsetY) {
        setIsScrolling(false);
        dispatch(setHideNav(false));
      }

      if (currentOffsetY > lastOffsetY) {
        setIsScrolling(true);
        dispatch(setHideNav(true));
      }

      lastOffsetY = currentOffsetY;
    },
    [dispatch],
  );

  return {
    isScrolling,
    scrollViewRef,
    lastOffsetY,
    handleScroll,
  };
};

export default useHideBottomNavOnScrollUp;
