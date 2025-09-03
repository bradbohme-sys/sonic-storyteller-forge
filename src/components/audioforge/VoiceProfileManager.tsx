import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Headphones, 
  Plus, 
  Play, 
  Settings, 
  User,
  Mic,
  Star,
  Download,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function VoiceProfileManager() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const voiceProfiles = [
    {
      id: '1',
      name: 'Emma Watson',
      character: 'Hermione Granger',
      voice: 'aria',
      quality: 95,
      usage: 24,
      isCloned: false,
      emotional_variants: ['Happy', 'Serious', 'Worried', 'Excited'],
      sample_text: 'Books and cleverness... there are more important things.',
      settings: { stability: 0.7, similarity: 0.8, style: 0.2 }
    },
    {
      id: '2',
      name: 'Morgan Freeman',
      character: 'Narrator',
      voice: 'daniel',
      quality: 98,
      usage: 48,
      isCloned: true,
      emotional_variants: ['Wise', 'Calm', 'Authoritative', 'Warm'],
      sample_text: 'Sometimes the best way to solve your problems is to help someone else.',
      settings: { stability: 0.9, similarity: 0.9, style: 0.1 }
    },
    {
      id: '3',
      name: 'Scarlett Johansson',
      character: 'Black Widow',
      voice: 'sarah',
      quality: 92,
      usage: 16,
      isCloned: false,
      emotional_variants: ['Confident', 'Intense', 'Playful', 'Determined'],
      sample_text: 'I\'ve got red in my ledger. I\'d like to wipe it out.',
      settings: { stability: 0.6, similarity: 0.7, style: 0.4 }
    },
    {
      id: '4',
      name: 'Benedict Cumberbatch',
      character: 'Sherlock Holmes',
      voice: 'george',
      quality: 96,
      usage: 32,
      isCloned: true,
      emotional_variants: ['Analytical', 'Condescending', 'Excited', 'Bored'],
      sample_text: 'The game is on!',
      settings: { stability: 0.8, similarity: 0.85, style: 0.3 }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="console-inset">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-audio-glow">
              <Headphones className="w-6 h-6" />
              <span>Voice Profile Manager</span>
            </CardTitle>
            <CardDescription>
              Manage character voices and maintain consistency across your audio projects
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Profiles List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="hover-audio">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Voice Profiles</span>
                </CardTitle>
                <Button variant="audio">
                  <Plus className="w-4 h-4 mr-2" />
                  New Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {voiceProfiles.map((profile, index) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover-audio ${
                      selectedProfile === profile.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedProfile(profile.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{profile.name}</h3>
                          {profile.isCloned && (
                            <Badge variant="secondary" className="bg-console-led/20 text-console-led">
                              <Mic className="w-3 h-3 mr-1" />
                              Cloned
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          Character: {profile.character}
                        </p>

                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-console-fader" />
                            <span>Quality: {profile.quality}%</span>
                          </div>
                          <div>Usage: {profile.usage} times</div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {profile.emotional_variants.slice(0, 3).map((variant) => (
                            <Badge key={variant} variant="outline" className="text-xs">
                              {variant}
                            </Badge>
                          ))}
                          {profile.emotional_variants.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{profile.emotional_variants.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm italic text-muted-foreground truncate">
                          "{profile.sample_text}"
                        </p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="play">
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {selectedProfile ? (
            <>
              {/* Profile Details */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Profile Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const profile = voiceProfiles.find(p => p.id === selectedProfile);
                    if (!profile) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground">{profile.character}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Voice Settings</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Stability:</span>
                              <span>{profile.settings.stability}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Similarity:</span>
                              <span>{profile.settings.similarity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Style:</span>
                              <span>{profile.settings.style}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Emotional Variants</h4>
                          <div className="flex flex-wrap gap-1">
                            {profile.emotional_variants.map((variant) => (
                              <Badge key={variant} variant="secondary" className="text-xs">
                                {variant}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 space-y-2">
                          <Button variant="audio" className="w-full">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                          <Button variant="console" className="w-full">
                            <Play className="w-4 h-4 mr-2" />
                            Test Voice
                          </Button>
                          <Button variant="destructive" className="w-full">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Profile
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Usage Statistics */}
              <Card className="hover-audio">
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const profile = voiceProfiles.find(p => p.id === selectedProfile);
                    if (!profile) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Quality Score</span>
                          <span className="text-sm font-medium">{profile.quality}%</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full" 
                            style={{ width: `${profile.quality}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm">Usage Count</span>
                          <span className="text-sm font-medium">{profile.usage} times</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm">Voice Type</span>
                          <span className="text-sm font-medium">{profile.isCloned ? 'Cloned' : 'Preset'}</span>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="hover-audio">
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a voice profile to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}