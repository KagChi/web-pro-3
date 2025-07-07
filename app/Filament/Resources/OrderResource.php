<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->required()
                    ->options([
                        'payment_required' => 'Payment Required',
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('total_amount')
                    ->label('Total Harga')
                    ->required()
                    ->disabled()
                    ->columnSpanFull()
                    ->formatStateUsing(fn($state) => $state !== null ? 'Rp ' . number_format($state, 0, ',', '.') : null),
                Forms\Components\TextInput::make('name')
                    ->label('Nama Pelanggan')
                    ->required()
                    ->maxLength(255)
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->maxLength(255)
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('phone')
                    ->label('Nomor Telepon')
                    ->tel()
                    ->maxLength(255)
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('address')
                    ->label('Alamat')
                    ->maxLength(255)
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('city')
                    ->label('Kota')
                    ->maxLength(255)
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('postal_code')
                    ->label('Kode Pos')
                    ->maxLength(255)
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('fingerprint')
                    ->label('Fingerprint')
                    ->maxLength(255)
                    ->disabled()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('ID Pesanan'),
                Tables\Columns\TextColumn::make('name')->label('Nama Pelanggan'),
                Tables\Columns\TextColumn::make('email')->label('Email'),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(function ($state) {
                        return match ($state) {
                            'payment_required' => 'Pembayaran Diperlukan',
                            'pending' => 'Menunggu',
                            'processing' => 'Diproses',
                            'completed' => 'Selesai',
                            'cancelled' => 'Dibatalkan',
                            default => ucfirst($state),
                        };
                    }),
                Tables\Columns\TextColumn::make('total_amount')->label('Total Harga')->money('idr', true),
                Tables\Columns\TextColumn::make('created_at')->label('Dibuat Pada')->dateTime('d M Y H:i'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'payment_required' => 'Pembayaran Diperlukan',
                        'pending' => 'Menunggu',
                        'processing' => 'Diproses',
                        'completed' => 'Selesai',
                        'cancelled' => 'Dibatalkan',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Edit')
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()->label('Hapus'),
                    Tables\Actions\BulkAction::make('mark_as_completed')
                        ->label('Tandai Selesai')
                        ->action(fn($records) => $records->each->update(['status' => 'completed'])),
                ]),
            ])
            ->headerActions([]);
    }

    public static function getRelations(): array
    {
        return [
            OrderResource\RelationManagers\ItemsRelationManager::class,
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
