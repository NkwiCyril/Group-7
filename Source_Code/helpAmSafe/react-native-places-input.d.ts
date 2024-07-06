declare module 'react-native-places-input' {
    import React from 'react';
  
    interface PlacesInputProps {
      googleApiKey: string;
      placeHolder?: string;
      onSelect: (data: any) => void;
    }
  
    const PlacesInput: React.FC<PlacesInputProps>;
  
    export default PlacesInput;
  }
  