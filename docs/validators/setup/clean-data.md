---
description: Clean up redundant data in your node.
title: Clean up data 
---

## Prune state

1. Go to your docker-compose dir, adding the entrypoint for overwriting  the container entrypoint

```services:
 node:
   image: ${NODE_IMAGE}
   stop_grace_period: 5m
   hostname: node
   container_name: node
.....
   entrypoint: ronin snapshot prune-state --datadir /ronin/data
....
   ports: ...
```

2. Run

```
docker-compose up -d 
```

Example log:

```
docker logs node -f --tail 5
```

```INFO [05-08|07:11:01.909] Deep froze chain segment                 blocks=6 elapsed=44.609ms number=34,350,654 hash=9b6606..7d9887
INFO [05-08|07:11:01.990] Initialized state bloom                  size=2.00GiB
INFO [05-08|07:11:02.895] Selecting bottom-most difflayer as the pruning target root=61d5f3..91e715 height=34,440,527
INFO [05-08|07:11:03.037] Deleted trie clean cache                 path=/ronin/data/ronin/triecache
INFO [05-08|07:11:03.052] Iterating state snapshot                 accounts=0 slots=0 elapsed="674.358µs"
INFO [05-08|07:11:11.052] Iterating state snapshot                 accounts=75398 slots=785 elapsed=8.000s      eta=32m41.227s
```
3. After the container process is finished, then remove the line added in step 1 and start the node again.

```
docker-compose up -d 
```

## Replace by Snapshot 

1. Download the latest snapshot link following [this repo](https://github.com/axieinfinity/ronin-snapshot)

```mkdir -p /root/ronin/chaindata/data/ronin/snapshot
cd /root/ronin/chaindata/data/ronin/snapshot
wget -q -O - <snapshot URL from the README file in the repo> | tar -I zstd -xvf -
```

2. Stop your node

```
docker-compose down
```

3. Remove the old chain data and replace it with snapshot

```cd /root/ronin/chaindata/data/ronin
rm -rf chaindata 
mv snapshot/chaindata ./ 
```

4. Start your node

```
docker-compose up -d
```

:::tip
- Prune state will create a huge downtime. With current data size of Ronin, it will take more than one hour for finishing this progress. We suggest to use the snapshot (if you have enough disk space to download the snapshot) to reduce downtime. 
- We should put a disk size alert with threshold 30% disk size left for starting the progressing maintenance for replacing disk( 4-5 months one time).
:::
