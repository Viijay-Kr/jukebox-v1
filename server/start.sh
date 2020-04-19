echo "Starting service"
function cleanup {
    kill "$USERS_PID"
    kill "$PLAYLISTS_PID"
    kill "$SONGS_PID"
    kill "$MAIN_PID"
    kill "$CHATS_PID"
}
trap cleanup EXIT
cwd=`pwd`
go build -o ${cwd}/tmp/srv-main ${cwd}/main.go
go build -o ${cwd}/tmp/srv-users ${cwd}/users/server.go
go build -o ${cwd}/tmp/srv-playlists ${cwd}/playlists/server.go
go build -o ${cwd}/tmp/srv-songs ${cwd}/songs/server.go
go build -o ${cwd}/tmp/srv-listenroom ${cwd}/listenroom/server.go

${cwd}/tmp/srv-main &
MAIN_PID=$!

${cwd}/tmp/srv-users &
USERS_PID=$!

${cwd}/tmp/srv-playlists &
PLAYLISTS_PID=$!

${cwd}/tmp/srv-songs &
SONGS_PID=$!

${cwd}/tmp/srv-listenroom &
CHATS_PID=$!


sleep 1

yarn && node ${cwd}/index.js